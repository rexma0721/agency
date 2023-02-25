package com.org.agencyapi.rest;

import com.org.agencyapi.config.SwaggerConfig;
import com.org.agencyapi.model.User;
import com.org.agencyapi.repository.UserRepository;
import com.org.agencyapi.rest.dto.otp.*;
import com.org.agencyapi.security.CustomUserDetails;
import com.org.agencyapi.service.EmailService;
import com.org.agencyapi.service.OTPService;
import com.org.agencyapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/otp")
public class OtpController {

    @Value("${app.twilio.account.sid}")
    private String TWILIO_ACCOUNT_SID;
    @Value("${app.twilio.account.token}")
    private String TWILIO_AUTH_TOKEN;
    @Value("${app.twilio.phonenumber}")
    private String From_Number;
    @Autowired
    UserRepository userRepository;

    private final UserService userService;
    @Autowired
    public OTPService otpService;
    @Autowired
    public EmailService emailService;


    @PostMapping("/generateEmailOtp")
    public ResponseEntity<?> generateEmailOtp(@Valid @RequestBody GenerateEmailOtpRequest generateEmailOtpRequest) throws JSONException {
        int otp = otpService.generateOTP(generateEmailOtpRequest.getEmail());
        EmailTemplate template = new EmailTemplate("SendOtp.html");
        Map<String,String> replacements = new HashMap<String,String>();
        replacements.put("otpnum", String.valueOf(otp));
        String message = template.getTemplate(replacements);
        JSONObject resp = new JSONObject();
        try {
            emailService.sendOtpMessage(generateEmailOtpRequest.getEmail(), "OTP -Agency", message);
            resp.put("status", true);
        } catch (Exception e) {
            System.err.println(e.toString());
            resp.put("status", false);
        }
        return ResponseEntity.ok(resp.toString());
    }

    @PostMapping("/validateEmailOtp")
    public ResponseEntity<?> validateEmailOtp(@Valid @RequestBody ValidateEmailOtpRequest validateEmailOtpRequest) throws JSONException {
        String username = validateEmailOtpRequest.getEmail();
        int otpcode = validateEmailOtpRequest.getCode();
        final String SUCCESS = "Entered Otp is valid";
        final String FAIL = "Entered Otp is NOT valid. Please Retry!";
        JSONObject resp = new JSONObject();

        if(validateEmailOtpRequest.getCode() > 0) {
            int serverOtp = otpService.getOtp(username);
            if(serverOtp > 0) {
                if(serverOtp == otpcode) {
                    otpService.clearOTP(username);
                    User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(String.format("Email %s not found", username)));
                    user.setEmail_verified(true);
                    userRepository.save(user);
                    resp.put("status", true);
                    resp.put("message", SUCCESS);
                } else {
                    resp.put("status", false);
                    resp.put("message", FAIL);
                }
            } else {
                resp.put("status", false);
                resp.put("message", FAIL);
            }
        } else {
            resp.put("status", false);
            resp.put("message", FAIL);
        }
        return ResponseEntity.ok(resp.toString());
    }

    @PostMapping("/generatePhoneOtp")
    public ResponseEntity<?> generatePhoneOtp(@Valid @RequestBody GeneratePhoneOtpRequest generatePhoneOtpRequest) {
        int otp = otpService.generatePhoneOTP(generatePhoneOtpRequest.getPhonenumber());
        try{
            Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
            Message.creator(new PhoneNumber(generatePhoneOtpRequest.getPhonenumber()),
                    new PhoneNumber(From_Number), String.format("Hello from Agency 📞 %d", otp)).create();
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok("Message Sent");
    }

    @PostMapping("/validatePhoneOtp")
    public ResponseEntity<?> validatePhoneOtp(@Valid @RequestBody ValidatePhoneOtpRequest validatePhoneOtpRequest) throws JSONException {
        String phonenumber = validatePhoneOtpRequest.getPhonenumber();
        int otpcode = validatePhoneOtpRequest.getCode();
        final String SUCCESS = "Entered Otp is valid";
        final String FAIL = "Entered Otp is NOT valid. Please Retry!";
        JSONObject resp = new JSONObject();

        if(otpcode > 0) {
            int serverOtp = otpService.getPhoneOtp(phonenumber);
            if(serverOtp > 0) {
                if(serverOtp == otpcode) {
                    otpService.clearPhoneOTP(phonenumber);
                    resp.put("status", true);
                    resp.put("message", SUCCESS);
                } else {
                    resp.put("status", false);
                    resp.put("message", FAIL);
                }
            } else {
                resp.put("status", false);
                resp.put("message", FAIL);
            }
        } else {
            resp.put("status", false);
            resp.put("message", FAIL);
        }
        return ResponseEntity.ok(resp.toString());
    }

    @Operation(security = {@SecurityRequirement(name = SwaggerConfig.BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/generate2fa")
    public ResponseEntity<?> generate2fa(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        int otp = otpService.generatePhoneOTP(user.getPhonenumber());
        try{
            Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
            Message.creator(new PhoneNumber(user.getPhonenumber()),
                    new PhoneNumber(From_Number), String.format("Hello from Agency 📞 %d", otp)).create();
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok("Message Sent");
    }
    @PostMapping("/validate2fa")
    public ResponseEntity<?> validate2fa(@AuthenticationPrincipal CustomUserDetails currentUser, @Valid @RequestBody Validate2faRequest validate2faRequest) throws JSONException {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        String phonenumber = user.getPhonenumber();
        int otpcode = validate2faRequest.getCode();
        final String SUCCESS = "Entered Otp is valid";
        final String FAIL = "Entered Otp is NOT valid. Please Retry!";
        JSONObject resp = new JSONObject();

        if(otpcode > 0) {
            int serverOtp = otpService.getPhoneOtp(phonenumber);
            if(serverOtp > 0) {
                if(serverOtp == otpcode) {
                    otpService.clearPhoneOTP(phonenumber);
                    resp.put("status", true);
                    resp.put("message", SUCCESS);
                } else {
                    resp.put("status", false);
                    resp.put("message", FAIL);
                }
            } else {
                resp.put("status", false);
                resp.put("message", FAIL);
            }
        } else {
            resp.put("status", false);
            resp.put("message", FAIL);
        }
        return ResponseEntity.ok(resp.toString());
    }
}
