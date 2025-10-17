// Telegram Bot Integration
class TelegramIntegration {
    constructor() {
        this.botToken = '8489597425:AAE9fNvU_gm7jUOIuw3lALmFVTZ3TtT7WVE';
        this.chatId = '-1003120738609';
        this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
    }

    // Отправка текстового сообщения
    async sendMessage(text, parseMode = 'HTML') {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: text,
                    parse_mode: parseMode
                })
            });

            const result = await response.json();
            if (!result.ok) {
                console.error('Telegram API Error:', result);
                throw new Error(result.description || 'Failed to send message');
            }
            return result;
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
            throw error;
        }
    }

    // Отправка документа (PDF)
    async sendDocument(documentBlob, filename, caption = '') {
        try {
            console.log('Converting Blob to File...');
            // Конвертируем Blob в File
            const file = new File([documentBlob], filename, { type: 'application/pdf' });
            console.log('File created:', file.name, file.size, 'bytes', file.type);
            
            const formData = new FormData();
            formData.append('chat_id', this.chatId);
            formData.append('document', file, filename);
            if (caption) {
                formData.append('caption', caption);
            }

            console.log('Sending to Telegram API...', this.apiUrl + '/sendDocument');
            const response = await fetch(`${this.apiUrl}/sendDocument`, {
                method: 'POST',
                body: formData
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Telegram API response:', result);
            
            if (!result.ok) {
                console.error('Telegram API Error:', result);
                throw new Error(result.description || 'Failed to send document');
            }
            return result;
        } catch (error) {
            console.error('Error sending document to Telegram:', error);
            throw error;
        }
    }

    // Форматирование сообщения для Writing теста
    formatWritingMessage(candidateId, testType = 'writing') {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const time = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return `#${testType}

👤 Candidate: ${candidateId}
📅 Date: ${date}
⏰ Time: ${time}

📄 IELTS ${testType.charAt(0).toUpperCase() + testType.slice(1)} Test Results`;
    }

    // Форматирование сообщения для Listening теста
    formatListeningMessage(candidateId, score, totalQuestions) {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const time = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return `#listening

👤 Candidate: ${candidateId}
📅 Date: ${date}
⏰ Time: ${time}

📄 IELTS Listening Test Results
📊 Score: ${score}/${totalQuestions}`;
    }

    // Форматирование сообщения для Reading теста
    formatReadingMessage(candidateId, score, totalQuestions) {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const time = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return `#reading

👤 Candidate: ${candidateId}
📅 Date: ${date}
⏰ Time: ${time}

📄 IELTS Reading Test Results
📊 Score: ${score}/${totalQuestions}`;
    }

    // Отправка результатов Writing теста (упрощенная версия)
    async sendWritingResults(candidateId, task1Content, task2Content) {
        // Эта функция больше не используется, так как PDF генерируется в самих HTML файлах
        throw new Error('This function is deprecated. Use sendDocument directly from HTML files.');
    }

    // Создание PDF для Writing теста
    async createWritingPDF(candidateId, task1Content, task2Content) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Настройка шрифта
        doc.setFont("helvetica");
        
        // Заголовок
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("IELTS Writing Test", 105, 20, { align: "center" });
        
        // Информация о кандидате
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Candidate ID: ${candidateId}`, 20, 35);
        doc.text(`Date: ${dateString}`, 20, 42);
        doc.text(`Time: ${timeString}`, 20, 49);
        
        // Task 1
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("TASK 1", 20, 65);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Question:", 20, 75);
        
        const task1Question = "The plans below show the South Wing of Walton Museum in 2008 and in 2012 after it was redeveloped.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.";
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const splitQuestion1 = doc.splitTextToSize(task1Question, 170);
        doc.text(splitQuestion1, 20, 85);
        
        const wordCount1 = task1Content.trim() === '' ? 0 : task1Content.trim().split(/\s+/).length;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Word Count: ${wordCount1}`, 20, 130);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Response:", 20, 145);
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const response1 = task1Content || '[No response provided]';
        const splitResponse1 = doc.splitTextToSize(response1, 170);
        doc.text(splitResponse1, 20, 155);
        
        // Новая страница для Task 2
        doc.addPage();
        
        // Task 2
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("TASK 2", 20, 20);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Question:", 20, 30);
        
        const task2Question = "Children are spending more time on computer games instead of doing regular exercise. Is this a positive or negative development?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.";
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const splitQuestion2 = doc.splitTextToSize(task2Question, 170);
        doc.text(splitQuestion2, 20, 40);
        
        const wordCount2 = task2Content.trim() === '' ? 0 : task2Content.trim().split(/\s+/).length;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Word Count: ${wordCount2}`, 20, 85);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Response:", 20, 100);
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        const response2 = task2Content || '[No response provided]';
        const splitResponse2 = doc.splitTextToSize(response2, 170);
        doc.text(splitResponse2, 20, 110);
        
        // Сводка
        doc.addPage();
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("SUMMARY", 20, 20);
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Total Words: ${wordCount1 + wordCount2}`, 20, 35);
        doc.text(`Task 1 Words: ${wordCount1}`, 20, 45);
        doc.text(`Task 2 Words: ${wordCount2}`, 20, 55);
        doc.text(`Date: ${dateString}`, 20, 65);
        doc.text(`Time: ${timeString}`, 20, 75);
        doc.text(`Candidate ID: ${candidateId}`, 20, 85);
        
        // Конвертируем в Blob
        const pdfOutput = doc.output('blob');
        return pdfOutput;
    }

    // Отправка результатов Listening теста
    async sendListeningResults(candidateId, answers, correctAnswers) {
        try {
            const score = answers.filter((answer, index) => answer === correctAnswers[index]).length;
            const totalQuestions = correctAnswers.length;
            
            const message = this.formatListeningMessage(candidateId, score, totalQuestions);
            const result = await this.sendMessage(message);
            
            console.log('Listening results sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Error sending listening results:', error);
            throw error;
        }
    }

    // Отправка результатов Reading теста
    async sendReadingResults(candidateId, answers, correctAnswers) {
        try {
            const score = answers.filter((answer, index) => answer === correctAnswers[index]).length;
            const totalQuestions = correctAnswers.length;
            
            const message = this.formatReadingMessage(candidateId, score, totalQuestions);
            const result = await this.sendMessage(message);
            
            console.log('Reading results sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Error sending reading results:', error);
            throw error;
        }
    }
}

// Создаем глобальный экземпляр
window.telegramIntegration = new TelegramIntegration();
