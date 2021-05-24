/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe('pushToHistory Tests', () => {
    test('push settings', () => {
        let result = pushToHistory('settings');
        expect(result.length).toBe(2);
        expect(result.state.page).toBe('settings');
    });
    test('push entry', () => {
        let result = pushToHistory('entry', 5);
        expect(result.state.page).toBe('entry5');
        expect(result.length).toBe(3);
    });

    test('push default', () => {
        pushToHistory('error', 1);
        pushToHistory('error', 10);
        pushToHistory('');
        const result = pushToHistory('', 2);
        expect(result.state.page).toBe(undefined);
        expect(result.length).toBe(7);
    });

});