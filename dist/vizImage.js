/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// Wrap everything in an anonymous function to avoid polluting the global namespace
(async () => {
    class VizImage {
        // Avoid globals.
        constructor(_$) {
            this._$ = _$;
        }
        /**
         * Initializes the extension
         */
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            await this.addVizImage(tableau.MarkType.Bar, 'tableau20_10_0');
            const markSelector = this._$('#mark-select');
            const colorSelector = this._$('#color-select');
            markSelector.prop('disabled', false);
            colorSelector.prop('disabled', false);
            // updating viz images with new values upon a selector change
            markSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
            colorSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
        }
        /**
         * Builds the input specifications and displays the created viz image
         * @param markType
         * @param colorPalette
         */
        async addVizImage(markType, palette) {
            // Building the input specification object that is used to create the viz image
            // Data values used in the viz image are prefilled
            const vizInputSpec = {
                data: {
                    values: [
                        { Product: 'Paper', Sales: 28, Region: 'Central' },
                        { Product: 'Pens', Sales: 45, Region: 'East' },
                        { Product: 'Rulers', Sales: 35, Region: 'East' },
                        { Product: 'Rulers', Sales: 43, Region: 'South' },
                        { Product: 'Paper', Sales: 50, Region: 'West' },
                        { Product: 'Pens', Sales: 56, Region: 'West' }
                    ]
                },
                description: 'A sample viz',
                encoding: {
                    color: { field: 'Product', type: tableau.VizImageEncodingType.Discrete, palette },
                    columns: { field: 'Region', type: tableau.VizImageEncodingType.Discrete },
                    rows: { field: 'Sales', type: tableau.VizImageEncodingType.Continuous }
                },
                mark: markType,
                markcolor: '#FFED5F',
                size: { width: 400, height: 300 }
            };
            // defaulting values if null
            if (markType === null) {
                vizInputSpec.mark = tableau.MarkType.Bar;
            }
            if (palette === null) {
                vizInputSpec.encoding.color.palette = 'tableau20_10_0';
            }
            const svg = await tableau.extensions.createVizImageAsync(vizInputSpec);
            // making call to create viz image from the input specifications
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const image = document.createElement('img');
            image.src = url;
            image.style.maxWidth = '100%';
            image.style.maxHeight = '100%';
            image.className = 'center-block';
            const vizApiElement = document.getElementById('viz-container');
            // clearing UI and adding in new viz
            vizApiElement.innerHTML = '';
            vizApiElement.appendChild(image);
            image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        }
    }
    console.log('Initializing VizImage extension.');
    await new VizImage($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=vizImage.js.map