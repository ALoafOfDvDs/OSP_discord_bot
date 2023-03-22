// change this so it exports a function to both update the table, adding things to it
// and it has a function to attempt to fetch data from the table

const {google} = require('googleapis');
const fs = require('fs');


module.exports = {

    getSheetValue(messageId) {
        // search the primary column of the sheet for the messageId, and if found return the associated interaction

        const credentials = JSON.parse(fs.readFileSync('client_secret_534397392378-tgenntfvj91qdavdgmnmmjp8tud31pnv.apps.googleusercontent.com.json', 'utf-8'));
        const authClientObject = new google.auth.OAuth2(
            credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0],
        );
        const token = fs.readFileSync('google-oauth-token.json', 'utf-8');
        authClientObject.setCredentials(JSON.parse(token));

        const sheet = google.sheets({
            version: "v4",
            auth: authClientObject
        });
        
        const params = {
            spreadsheetId: process.env.GOOGLE_TEST_SHEET_ID
        };

        sheet.spreadsheets.get(params, (err, res) => {
            if (err) {
                console.error(err);
                throw err;
            }
            if(res) {
                console.log(res);
                // console.log(`the sheet url is ${res.data.url}`);
            }
        });
    },
    async newSheetRow(messageId, interaction) {
        console.log(interaction);
        // update the google sheet and add a new row to it with the message id of the mod interaction, 
        // and the interaction object of the original ephemeral message
        

        const credentials = JSON.parse(fs.readFileSync('client_secret_534397392378-tgenntfvj91qdavdgmnmmjp8tud31pnv.apps.googleusercontent.com.json', 'utf-8'));
        const authClientObject = new google.auth.OAuth2(
            credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0],
        );
        const token = fs.readFileSync('google-oauth-token.json', 'utf-8');
        authClientObject.setCredentials(JSON.parse(token));

        const sheet = google.sheets({
            version: "v4",
            auth: authClientObject
        });

        sheet.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_TEST_SHEET_ID,
            range: "Sheet1!A:B",
            valueInputOption: 'USER_ENTERED',
            resource: {
                // values: [[`${mod_message.id}`],[`${interaction}`]],
                values: [[`${messageId}`,`${interaction}`]],
            },
        });



        // const client_json = require('client_secret_534397392378-tgenntfvj91qdavdgmnmmjp8tud31pnv.apps.googleusercontent.com.json');
        // const client = JSON.parse(client_json);
        // const clientSecret = client.client_secret;
        // const clientId = client.client_id;


        // const auth = new google.auth.OAuth2({
        //     keyFile: "client_secret_534397392378-tgenntfvj91qdavdgmnmmjp8tud31pnv.apps.googleusercontent.com.json",
        //     scopes: "https://www.googleapis.com/auth/spreadsheets",
        // });
        // const authClientObject = await auth.getClient();
        // const sheet = google.sheets({
        //     version: "v4",
        //     auth: authClientObject
        // });
        // sheet.spreadsheets.values.append({
        //     auth,
        //     spreadsheetId: process.env.GOOGLE_TEST_SHEET_ID,
        //     range: "Sheet1!A:B",
        //     // valueInputOption:
        //     resource: {
        //         // values: [[`${mod_message.id}`],[`${interaction}`]],
        //         values: [["column 1"],["column 2"]],
        //     },
        // });
    }
}