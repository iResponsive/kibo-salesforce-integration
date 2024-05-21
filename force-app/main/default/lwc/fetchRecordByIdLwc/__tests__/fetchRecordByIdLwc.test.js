import { createElement } from 'lwc';
import FetchRecordByIdLwc from 'c/fetchRecordByIdLwc';

describe('c-fetch-record-by-id-lwc', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-fetch-record-by-id-lwc', {
            is: FetchRecordByIdLwc
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});