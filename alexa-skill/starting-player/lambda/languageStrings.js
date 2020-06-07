/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            CONFIRMATION_SOUND: `<say-as interpret-as="interjection">great</say-as>  <break time="1s"/> `,
            NO_CONFIRMATION_SOUND: `<say-as interpret-as="interjection">as you wish</say-as>  <break time="1s"/>`,
            LANGUAGE: `EN`,
            STARTING_PLAYER: `The starting player is:`,
            STARTING_PLAYER_IS: `{{rule}}`,
            HELP_MSG: `I'll help you to choose who should start playing.
                        In addition to this skill there is also a web application and a telegram bot with the same functions.
                        You can ask me who the starting player is, ot you can suggest me a new rule to add to the ones I will propose to you,
                        or you can activate or deactivate the quick mode.
                        With the quick mode I will tell you the rule immediately after you say: Alexa, open Starting Player.`,
            REPROMT: `If you did not like this rule, ask me to say another one, or suggest me a new rule`,
            SEND_THANKYOU: `Thanks for your tip, the new rules will be checked before they are available to all users. Now you can ask me who is the starting player, or you can suggest me another rule`,
            SEND_THANKYOU_RP: `Now, you can ask me who is the starting player, or you can suggest me another rule`,
            GOODBYE_MSG: [
                `<say-as interpret-as="interjection">goodbye</say-as> and have fun!`,
                `bye bye`,
                `<say-as interpret-as="interjection">goodbye</say-as>`],
            REFLECTOR_MSG: `You just triggered {{intentName}}`,
            ERROR_MSG: `Sorry, there was an error. The starting player is the last person to have made a mistake.`,
            WELCOME_MSG: `<say-as interpret-as="interjection">Welcome</say-as>`,
            WELCOME_BACK_USR_MSG: [
                `welcomeback, {{name}}!`,
                `Hello {{name}}, welcomeback!`,
                `nice to hear you, {{name}}!`, 
                `<say-as interpret-as="interjection">hello</say-as> {{name}}!`],
            PRE_COUNT: [
                `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_major_chord_01'/>`,
                ],
            RULES_COUNT: [
                `I have already suggested <say-as interpret-as="cardinal">{{numero}}</say-as> rules`,
                `You have already listened to <say-as interpret-as="cardinal">{{numero}}</say-as> rules`,
                `You asked me who starts <say-as interpret-as="cardinal">{{numero}}</say-as> times`,
                `I told you the starting player <say-as interpret-as="cardinal">{{numero}}</say-as> times`,
                `I told you the first player <say-as interpret-as="cardinal">{{numero}}</say-as> times`,
                `I chose the first player <say-as interpret-as="cardinal">{{numero}}</say-as> times`,
                `I have chosen the starting player <say-as interpret-as="cardinal">{{numero}}</say-as> times`],
            REVIEW_REQ: [
                `if you like what i do could you leave me a positive review? You can do it from the Alexa app or from the Amazon site! `,
                `Do you like what I do? Then go to the Alexa app or Amazon site and leave me a review! `,
                `Have you already left a review to this skill? You can do it in the Alexa app or on the Amazon site! `,
                `If you like what I do you can leave me a review in the Alexa app or on the Amazon site!`],
            RULE_REQ: [
                `remember that you can also suggest new rules to propose.`,
                `I would like you to offer me a new rule every now and then`,
                `when you want to suggest a rule you just say: alexa, start initial player and propose a rule`],
            WAIT_FOR_COMMAND: `You can ask me who the starting player is, or tell me help if you want to know more`,
            WAIT_FOR_COMMAND_REP: `pronounce: tell me who starts, to know the starting player. Tell me help if you want to know more`
        }
    },
    it: {
        translation: {
            CONFIRMATION_SOUND: `<say-as interpret-as="interjection">ben fatto</say-as>  <break time="1s"/> `,
            NO_CONFIRMATION_SOUND: `<say-as interpret-as="interjection">come vuoi</say-as>  <break time="1s"/>`,
            LANGUAGE: `IT`,
            STARTING_PLAYER: `Il giocatore iniziale è:`,
            STARTING_PLAYER_IS: `{{rule}}`,
            HELP_MSG: `Ti aiuterò a scegliere chi deve iniziare a giocare. 
                       Oltre a questa skill esiste anche un'applicazione web e un bot telegram con le stesse funzioni, basta che cerchi giocatore iniziale.
                       Puoi chiedermi chi è il giocatore iniziale, puoi suggerirmi una nuova regola da aggiungere a quelle che ti proporrò, 
                       oppure puoi attivare o disattivare la modalità rapida. 
                       Con la modalità rapida ti dirò la regola subito dopo che hai pronunciato: Alexa, avvia giocatore iniziale.`,
            REPROMT: `Se non ti è piaciuta questa regola chiedimi di dirne un'altra, oppure suggeriscimi una nuova regola tu`,
            SEND_THANKYOU: `Grazie per il tuo suggerimento, le nuove regole saranno controllate prima di essere disponibili a tutti gli utilizzatori. 
                            Adesso puoi aggiungere un'altra regola oppure chiedermi chi inizia.`,
            GOODBYE_MSG: [
                `<say-as interpret-as="interjection">ciao</say-as>, e buon gioco!`,
                `<say-as interpret-as="interjection">ciao</say-as>, e alla prossima!`,
                `<say-as interpret-as="interjection">ciao</say-as>, e a presto!`,
                `<say-as interpret-as="interjection">ciao</say-as>!`,
                `a risentirci!`],
            REFLECTOR_MSG: `Hai invocato l'intento {{intentName}}`,
            ERROR_MSG: `Mi dispiace, c'è stato un errore. Il giocatore iniziale è l'ultima persona ad aver commesso un errore!`,
            WELCOME_MSG: `<say-as interpret-as="interjection">benvenuto</say-as>`,
            WELCOME_BACK_USR_MSG: [
                `bentornato, {{name}}!`,
                `<say-as interpret-as="interjection">ciao</say-as> {{name}}, bentornato!`,
                `Felice di risentirti, {{name}}!`, 
                `<say-as interpret-as="interjection">ciao</say-as> {{name}}!`],
            PRE_COUNT: [
                `<audio src='soundbank://soundlibrary/musical/amzn_sfx_electronic_major_chord_01'/>`,
                ],
            RULES_COUNT: [
                `Ti ho già suggerito <say-as interpret-as="cardinal">{{numero}}</say-as> regole`,
                `Hai già ascoltato <say-as interpret-as="cardinal">{{numero}}</say-as> regole`,
                `Mi hai chiesto chi comincia <say-as interpret-as="cardinal">{{numero}}</say-as> volte`,
                `Ti ho detto il giocatore iniziale <say-as interpret-as="cardinal">{{numero}}</say-as> volte`,
                `Ti ho detto il primo giocatore <say-as interpret-as="cardinal">{{numero}}</say-as> volte`,
                `Ho scelto il primo giocatore <say-as interpret-as="cardinal">{{numero}}</say-as> volte`,
                `Ho scelto il giocatore iniziale <say-as interpret-as="cardinal">{{numero}}</say-as> volte`],
            REVIEW_REQ: [
                `se ti piace quello che faccio potresti lasciarmi una recensione positiva? Puoi farlo dall'app Alexa o dal sito Amazon!`,
                `ti piace quello che faccio? Allora vai nell'app Alexa o sul sito Amazon e lasciami una recensione!`,
                `hai già lasciato una recensione a questa skill? Puoi farlo nell'app Alexa o sul sito Amazon!`,
                `se ti piace quello che faccio puoi lasciarmi una recensione nell'app Alexa o sul sito Amazon!`],
            RULE_REQ: [
                `ricordati che puoi anche suggerire tu nuove regole da proporre.`,
                `mi farebbe piacere che anche tu mi proponga una nuova regola ogni tanto`,
                `quando vuoi suggerirmi una regola tu basta che dici: alexa, avvia giocatore iniziale e proponi una regola`],
            WAIT_FOR_COMMAND: `Puoi chiedermi chi è il giocatore iniziale, oppure dimmi aiuto se vuoi sapere altro`,
            WAIT_FOR_COMMAND_REP: `pronuncia: dimmi chi inizia, per conoscere il giocatore iniziale. Dimmi aiuto se vuoi sapere altro` 
        }
    }
}
