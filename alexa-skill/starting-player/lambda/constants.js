module.exports = {
    // we now specify which attributes are saved (see the save interceptor below)
    PERSISTENT_ATTRIBUTES_NAMES: ['rOL', 'rC', 'sC', 'aR'], //['ruleOnLaunch', 'ruleCounter', 'sessionCounter', 'addRuleCount'],
    ASK_FOR_REVIEW_AFTER: 5, //dopo 5
    ASK_FOR_REVIEW_REC: 10, //ogni  10
    ASK_FOR_NEW_RULE_AFTER: 10, //poi ogni 10
    ASK_FOR_NEW_RULE_REC: 20, //ogni quanto 10
    ASK_FOR_AUTO_AFTER: 2, //dopo 2
    ASK_FOR_AUTO_REC: 10, //dopo 2
    
    // these are the permissions needed to fetch the first name
    GIVEN_NAME_PERMISSION: ['alexa::profile:given_name:read']//,
    // these are the permissions needed to send reminders
    //REMINDERS_PERMISSION: ['alexa::alerts:reminders:skill:readwrite'],
    // APL documents
    //APL: {
    //    launchDoc: require('./documents/launchScreen.json'),
    //    listDoc: require('./documents/listScreen.json')
    //}
}