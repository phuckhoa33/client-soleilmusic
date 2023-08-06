function generateRandomNumber() {
    let randomNumber = '';
    for (let i = 0; i < 10; i++) {
      const digit = Math.floor(Math.random() * 10); // Sinh ngẫu nhiên các chữ số từ 0 đến 9
      randomNumber += digit;
    }
    return randomNumber;
  }

export default generateRandomNumber;