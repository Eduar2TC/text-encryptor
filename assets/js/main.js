document.addEventListener("DOMContentLoaded", function () {
    let textInput = document.querySelector('#text');
    let result = document.querySelector('#result');
    let buttonEncryptListener = document.querySelector('.container-buttons button:nth-child(1)');
    let buttonDecryptListener = document.querySelector('.container-buttons button:nth-child(2)');
    let buttonCopyTextListener = document.querySelector('.container-boxes .col:nth-child(2) button');
    let mapToEncrypt = {
        a: 'ai',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat'
    };
    let mapToDecrypt = {
        ai: 'a',
        enter: 'e',
        imes: 'i',
        ober: 'o',
        ufat: 'u'
    };
    textInput.addEventListener('click', function(){
        textInput.style.outlineColor = 'rebeccapurple';
    } );
    buttonEncryptListener.addEventListener('click', function(e){
        e.preventDefault;
        if( textInput.value.length > 0 ){
            let textSanitized = textInput.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textEncrypted = textSanitized.replace(/a|e|i|o|u/gi, function (matched) {
                return mapToEncrypt[matched];
            });
            result.value = textEncrypted;
        }else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    });
    buttonDecryptListener.addEventListener('click', function(e){
        e.preventDefault;
        if( textInput.value.length > 0 ){
            let textSanitized = result.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textDecrypted = textSanitized.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
                return mapToDecrypt[matched];
            });
            result.value = textDecrypted;
        }else if( result.value.length >0 && textInput.value.length == 0 ){
            let textSanitized = result.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textDecrypted = textSanitized.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
                return mapToDecrypt[matched];
            });
            result.value = textDecrypted;
        }
        else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    });
    buttonCopyTextListener.addEventListener('click', function(){
        let text = result.value;
        if( text.length > 0 ){
            navigator.clipboard.writeText(text).then(
                /* clipboard successfully set */
                function () {
                    textInput.value = '';
                    textInput.focus();
                    buttonCopyTextListener.style.transition = 'width 0.3s ease-out';
                    buttonCopyTextListener.style.width = '7rem';
                    buttonCopyTextListener.innerHTML = 'Copied!';
                    setTimeout(() => { 
                        buttonCopyTextListener.style.width = '5rem';
                        buttonCopyTextListener.innerHTML = 'Copy'; 
                    }, 1000);
                },
                /* clipboard write failed */
                function () {
                    window.alert('Opps! Your browser does not support the Clipboard API');
                }
            );
        }else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    } );

});