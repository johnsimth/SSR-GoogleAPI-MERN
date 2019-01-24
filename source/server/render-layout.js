export default ({ settings, rootMarkup, initialState }) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Transfervans - Business</title>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="description=" content="On-demand delivery of furniture and beds in Auckland, Schedule your delivery or order it for the same day.">
            <link rel="icon" type="image/png" href="/business/static/images/logo.png">
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
            <meta name="google-signin-client_id" content="362669020740-b94kh8c55fjcq8pnoflqjltdjtc2814s.apps.googleusercontent.com">
        </head>
        <body>
            <div id='root'>${ rootMarkup }</div>
            <script src="/business/static/index.js"></script>
            <script
                src="https://maps.googleapis.com/maps/api/js?language=en&signed_in=false&libraries=places">
            </script>
        </body>
    </html>
    `;
};
