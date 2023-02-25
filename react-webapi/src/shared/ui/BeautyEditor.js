import * as React from "react";

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from "./ClassicEditor.d.ts";

import { backend_endpoint } from "src/utils/static";
import { getCookie } from "src/utils/helper/cookieHelper";
import { v4 as uuidv4 } from 'uuid' ;

import Loading from 'react-loading-components';

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
        return new MyUploadAdapter({
            loader : loader,
            custom_id : editor.config._config.custom_id
        })
    }
}

class MyUploadAdapter {
    constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props.loader;
        this.custom_id = props.custom_id ;
        // URL where to send files.
        this.url = `${backend_endpoint}/blog/uploadImage`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhr.setRequestHeader('Authorization', `Bearer ${getCookie('access_token')}`)
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.s3Url
            });
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {

        this.loader.file.then(result => {
            const file_name = uuidv4() ;
            let fn = new FormData();


            fn.append('folder_id', this.custom_id) ;
            fn.append('file_name', file_name) ;
            fn.append(file_name, result);
            
            this.xhr.send(fn);
        })
    }
}

const BeautyEditor = (props) => {
    const {
        onChange, name, content,
        id,
    } = props ;

    const custom_config = {
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
        
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            '|',
            'imageUpload',
            'undo',
            'redo',
          ]
        },
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
    }
    
    return (
        <>
            <CKEditor
                type=""
                name={name}
                data={content}
                editor={ClassicEditor}
                config={{
                    ...custom_config,
                    custom_id : id
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
           
        </>
    );
}

export default BeautyEditor;
