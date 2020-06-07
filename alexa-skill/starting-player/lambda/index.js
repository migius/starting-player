// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.

/////////////////////////////////
// Modules Definition
/////////////////////////////////

// ASK SDK
const Alexa = require('ask-sdk-core');
// ASK SDK adapter to connecto to Amazon S3
const persistenceAdapter = require('ask-sdk-s3-persistence-adapter');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// We import a language strings object containing all of our strings.
// The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG')
const languageStrings = require('./languageStrings');
// We will use the moment.js package in order to make sure that we calculate the date correctly
const moment = require('moment-timezone');
const util = require('./util'); // utility functions
const interceptors = require('./interceptors'); // utility functions
const handler = require('./handlers'); // utility functions



/////////////////////////////////
// SkillBuilder Definition
/////////////////////////////////

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({ bucketName: process.env.S3_PERSISTENCE_BUCKET })
    )
    .addRequestHandlers(
        handler.LaunchRequestHandler,
        handler.GiocatoreInizialeHandler,
        handler.AggiungiRegolaIntentHandler,
        handler.SetAutoRuleIntentHandler,
        handler.DeleteAutoRuleIntentHandler,
        handler.HelpIntentHandler,
        handler.CancelAndStopIntentHandler,
        handler.SessionEndedRequestHandler,
        handler.IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        handler.ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoadAttributesRequestInterceptor,
        interceptors.LocalisationRequestInterceptor,
        interceptors.LoggingRequestInterceptor,
        interceptors.LoadNameRequestInterceptor,
        interceptors.LoadTimezoneRequestInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor,
        interceptors.SaveAttributesResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();