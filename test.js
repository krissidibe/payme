alert('alert');
 

function calltouchpay(){

alert('calltouchpay');
    return
    sendPaymentInfos(new Date().getTime(),
                     'MEEEN6554','FCEmWBxHyM1FaChW92QDRocUGdr9lwwG1ulrpXUg4BP5Hsml0J',
                     'meeentreprise.com',  'success_url',
                     'google.com', 5000,
                     'Abidjan', 'test1','tes2', 'test2',  'test3');
}