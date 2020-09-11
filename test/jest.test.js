test('Devo conhecer o basico das assertivas', () => {
    let number = null;
    expect(number).toBeNull();
    number = 10;
    expect(number).not.toBeNull();
}); 