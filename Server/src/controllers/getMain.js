const getMain = async (req, res) => {
    const htmResponse = `
            <html>
                <head>
                    <title>Backend running</title>
                </head>
                <body>
                    <h1>Running</h1>
                </body>
            </html>`;
    res.send(htmResponse);
};
module.exports = getMain;
