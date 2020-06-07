var https = require('https');


function callDirectiveService(handlerInput, msg) {
    // Call Alexa Directive Service.
    const {requestEnvelope} = handlerInput;
    const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();
    const requestId = requestEnvelope.request.requestId;
    const {apiEndpoint, apiAccessToken} = requestEnvelope.context.System;
    // build the progressive response directive
    const directive = {
        header: {
            requestId
        },
        directive:{
            type: 'VoicePlayer.Speak',
            speech: msg
        }
    };
    // send directive
    return directiveServiceClient.enqueue(directive, apiEndpoint, apiAccessToken);
}

function supportsAPL(handlerInput) {
    const {supportedInterfaces} = handlerInput.requestEnvelope.context.System.device;
    return !!supportedInterfaces['Alexa.Presentation.APL'];
}


function httpGet(ApiHost,ApiPort,ApiPath) {
  return new Promise(((resolve, reject) => {
    var options = {
        host: ApiHost,
        port: ApiPort,
        path: ApiPath,
        method: 'GET',
    };
    
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
      });

      response.on('end', () => {
          console.log(returnData);
        
        resolve(JSON.parse(returnData));
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}

function DecodeHTML(s) {
    return s.replace(/&apos;/g, "'")
               .replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&#x2F;/g, '/')
               .replace(/&amp;/g, '&');
  }
  
async function getRule(handlerInput)
{
    const path = '/sp/res/getRules.php?l=' + handlerInput.t('LANGUAGE') + '&limit=1&ch=alexa';
    console.log('MMBB path:' + path);
    var response = await httpGet('migio.altervista.org',443, path);
    
    //console.log('MMBB response:' + response[0].Rule);
    
    const rule = response[0].AlexaSpeak.replace('{Rule}', DecodeHTML(response[0].Rule));
    
    console.log('MMBB rule:' + rule);
    
    return  rule;
}

module.exports = {
    callDirectiveService,
    supportsAPL,
    httpGet,
    DecodeHTML,
    getRule
};