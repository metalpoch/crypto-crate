import React from 'react';
import QRCode from 'qrcode.react';

function App() {
    return (
        <div>
            <QRCode value="keiber te odio por no decirme de client:visible"
                size={320}
                includeMargin={true}
                // bgColor='#FFFFFF'
                // fgColor='#0000'
            />
        </div>
    );
}

export default App;
