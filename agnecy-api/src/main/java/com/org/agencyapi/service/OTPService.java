package com.org.agencyapi.service;

import org.springframework.stereotype.Service;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService {
    private static final Integer EXPIRE_MINS = 4;
    private static final Integer PHONE_EXPIRE_MINS = 1;
    private LoadingCache<String, Integer> otpCache;
    private LoadingCache<String, Integer> phoneOtpCache;
    public OTPService(){
        super();
        otpCache = CacheBuilder.newBuilder().
                expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
                .build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
        phoneOtpCache = CacheBuilder.newBuilder().
                expireAfterWrite(PHONE_EXPIRE_MINS, TimeUnit.MINUTES)
                .build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }
    //This method is used to push the opt number against Key. Rewrite the OTP if it exists
    //Using user id  as key
    public int generateOTP(String key){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        otpCache.put(key, otp);
        return otp;
    }
    //This method is used to return the OPT number against Key->Key values is username
    public int getOtp(String key){
        try{
            return otpCache.get(key);
        }catch (Exception e){
            return 0;
        }
    }
    //This method is used to clear the OTP catched already
    public void clearOTP(String key){
        otpCache.invalidate(key);
    }

    //phonepart
    public int generatePhoneOTP(String key){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        phoneOtpCache.put(key, otp);
        return otp;
    }
    //This method is used to return the OPT number against Key->Key values is username
    public int getPhoneOtp(String key){
        try{
            return phoneOtpCache.get(key);
        }catch (Exception e){
            return 0;
        }
    }
    //This method is used to clear the OTP catched already
    public void clearPhoneOTP(String key){
        phoneOtpCache.invalidate(key);
    }
}
