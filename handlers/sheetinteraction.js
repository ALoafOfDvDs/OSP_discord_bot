// change this so it exports a function to both update the table, adding things to it
// and it has a function to attempt to fetch data from the table
const {google} = require('googleapis');
const fs = require('fs');

module.exports = {
    async getSheetValue(messageId) {
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



        const request = {
            spreadsheetId: process.env.GOOGLE_TEST_SHEET_ID,
            valueRenderOption: 'FORMATTED_VALUE',
            range: 'Sheet1!A1:B',
            majorDimension: 'ROWS',
            auth: authClientObject,
        };


        try {
            const data = await sheet.spreadsheets.values.get(request);
            const rows = data.data.values
            for (let i = 0; i < rows.length; i += 1) {
                if(rows[i][0] === messageId) {
                    // then it may be to my advantage to delete this entry here to keep the size of the 
                    // sheet small, unless I can somehow start archiving things after 15 minutes
                    console.log(rows[i][1]);
                    return rows[i][1];
                }
            }
        }
        catch (error) {
            console.error(error);
        }

    },
    async newSheetRow(messageId, interaction_token) {
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

        await sheet.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_TEST_SHEET_ID,
            range: "Sheet1!A:B",
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[`${messageId}`,`${interaction_token}`]],
            },
        });
    }
}