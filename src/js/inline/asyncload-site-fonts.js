/* -- A listener to ensure the fonts we need to use have been loaded */

if (document.documentElement.className.indexOf('fonts-loaded') < 0) {
    var FontFaceObserver = window.FontFaceObserver;

    var BrandonRegular = new FontFaceObserver('brandon', {
        weight: 400,
    });
    var BrandonRegularItalic = new FontFaceObserver('brandon', {
        weight: 400,
        style: 'italic',
    });
    var BrandonBold = new FontFaceObserver('brandon', {
        weight: 700,
    });
    var Esfera = new FontFaceObserver('esfera', {
        weight: 400,
    });

    Promise.all([
        BrandonRegular.load(),
        BrandonRegularItalic.load(),
        BrandonBold.load(),
        Esfera.load(),
    ]).then(function () {

        document.documentElement.className += ' fonts-loaded';
        window.Cookie.set('fonts-loaded', 1, { expires: '7D', secure: true });
    });
}
