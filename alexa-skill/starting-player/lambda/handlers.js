const Alexa = require('ask-sdk-core');
const util = require('./util'); // utility functions
const constants = require('./constants');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        if(sessionAttributes['sC']) {
            //non è la prima sessione
            if(!sessionAttributes['name']) {
                await util.callDirectiveService(handlerInput, handlerInput.t('WELCOME_BACK_USR_MSG'));
            }
            else {
                await util.callDirectiveService(handlerInput, handlerInput.t('WELCOME_BACK_USR_MSG', { name: sessionAttributes['name']}));
            }
        }
        else {
             await util.callDirectiveService(handlerInput, handlerInput.t('WELCOME_MSG'));
        }
        
        if(sessionAttributes['rOL']) {
            return GiocatoreInizialeHandler.handle(handlerInput);
        }
        else {
            return handlerInput.responseBuilder
            .speak(handlerInput.t('WAIT_FOR_COMMAND'))
            .reprompt(handlerInput.t('WAIT_FOR_COMMAND_REP'))
            .withShouldEndSession(false)
            .getResponse();
        }
    }
};

const GiocatoreInizialeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'GiocatoreInizialeIntent';
  },
  async handle(handlerInput) {
      
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        if(sessionAttributes['rC']%constants.ASK_FOR_REVIEW_REC === constants.ASK_FOR_REVIEW_AFTER ) {
            //dopo un certo numero di regole
            const review_r = `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_major_chord_01'/>` + handlerInput.t('RULES_COUNT', { numero: sessionAttributes['rC']}) + ". " + handlerInput.t('REVIEW_REQ');
            console.log(review_r);
            await util.callDirectiveService(handlerInput, review_r);
        }
        else if(sessionAttributes['rC']%constants.ASK_FOR_NEW_RULE_REC === constants.ASK_FOR_NEW_RULE_AFTER && !sessionAttributes['aR']) {
            //dopo un certo numero di regole senza aver mai suggerito nulla
            const rule_r = `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_major_chord_01'/>` + handlerInput.t('RULES_COUNT', { numero: sessionAttributes['rC']}) + ". " + handlerInput.t('RULE_REQ');
            console.log(rule_r);
            await util.callDirectiveService(handlerInput, rule_r);
        }
        
        sessionAttributes['rC'] = sessionAttributes['rC'] ? sessionAttributes['rC'] + 1 : 1;
        
        await util.callDirectiveService(handlerInput, handlerInput.t('STARTING_PLAYER'));
        
        const regola = await util.getRule(handlerInput)
        console.log(regola);
        
        if(!sessionAttributes['rOL'] &&
            sessionAttributes['rC']%constants.ASK_FOR_AUTO_REC === constants.ASK_FOR_AUTO_AFTER) {
            //non è attiva la regola automatica e chiedo se si vuole attivare
            return handlerInput.responseBuilder
                .speak(regola)
                .addDelegateDirective({
                    name: 'SetAutoRuleIntent',
                    confirmationStatus: 'NONE',
                    slots: {}
                })
                .withShouldEndSession(false)
                .getResponse();
        }
        else {
            //è attiva la regola automatica 
            return handlerInput.responseBuilder
                .speak(regola)
                .withShouldEndSession(true)
                .getResponse();
        }
  },
};

const AggiungiRegolaIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AggiungiRegolaIntent';
  },
  async handle(handlerInput) {
      
        const { attributesManager, requestEnvelope } = handlerInput;
        
        const path = '/sp/res/sendSuggestion.php?l=' + handlerInput.t('LANGUAGE') + '&p=' +  encodeURIComponent(Alexa.getSlotValue(requestEnvelope, 'proposta')) + '&a=Alexa';
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes['aR'] = sessionAttributes['aR'] ? sessionAttributes['aR'] + 1 : 1;
        
        console.log('MMBB path:' + path);
        var response = await util.httpGet('migio.altervista.org',443, path);
        
        return handlerInput.responseBuilder
            .speak(handlerInput.t('SEND_THANKYOU'))
            .reprompt(handlerInput.t('WAIT_FOR_COMMAND_REP'))
            .getResponse();
  },
};


const SetAutoRuleIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'SetAutoRuleIntent';
  },
  async handle(handlerInput) {
        
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        let audioFeedback = "";
        console.log(JSON.stringify(intent));
        console.log(intent.confirmationStatus);
        if (intent.confirmationStatus === 'CONFIRMED') {
            
            sessionAttributes['rOL'] = 1;
            
            audioFeedback += handlerInput.t('CONFIRMATION_SOUND');
        } else {
            audioFeedback += handlerInput.t('NO_CONFIRMATION_SOUND');
        }
        
        return handlerInput.responseBuilder
            .speak(audioFeedback + handlerInput.t('WAIT_FOR_COMMAND'))
            .reprompt(audioFeedback + handlerInput.t('WAIT_FOR_COMMAND_REP'))
            .withShouldEndSession(false)
            .getResponse();
  },
};


const DeleteAutoRuleIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'DeleteAutoRuleIntent';
  },
  async handle(handlerInput) {
      
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = requestEnvelope.request;
        
        let audioFeedback = "";
        if (intent.confirmationStatus === 'CONFIRMED') {
            
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes['rOL'] = 0;
            
            audioFeedback += handlerInput.t('CONFIRMATION_SOUND');
        } else {
            audioFeedback += handlerInput.t('NO_CONFIRMATION_SOUND');
        }
        
        return handlerInput.responseBuilder
            .speak(audioFeedback + handlerInput.t('WAIT_FOR_COMMAND'))
            .reprompt(handlerInput.t('WAIT_FOR_COMMAND_REP'))
            .withShouldEndSession(false)
            .getResponse();
  },
};



/**
 * Handles AMAZON.HelpIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.HelpIntent intent defined in your intent schema.
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Handles AMAZON.CancelIntent & AMAZON.StopIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.CancelIntent & AMAZON.StopIntent intents defined in your intent schema.
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', { intentName: intentName });
        
        console.log(speakOutput);
        
        return handlerInput.responseBuilder
            .speak(handlerInput.t('ERROR_MSG'))
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speakOutput = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};





module.exports = {
    LaunchRequestHandler,
    GiocatoreInizialeHandler,
    AggiungiRegolaIntentHandler,
    SetAutoRuleIntentHandler,
    DeleteAutoRuleIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler
}