<?php
require_once 'config.php';

$pdo = getDBConnection();
$successMessage = '';
$errorMessage = '';

// Обработка отправки формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $patientName = trim($_POST['patient_name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $doctorId = intval($_POST['doctor_id'] ?? 0);
    $appointmentDate = $_POST['appointment_date'] ?? '';
    $appointmentTime = $_POST['appointment_time'] ?? '';
    $message = trim($_POST['message'] ?? '');

    // Валидация
    if (empty($patientName) || empty($phone) || empty($doctorId) || empty($appointmentDate) || empty($appointmentTime)) {
        $errorMessage = 'Пожалуйста, заполните все обязательные поля.';
    } else {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO appointments (patient_name, phone, email, doctor_id, appointment_date, appointment_time, message)
                VALUES (:patient_name, :phone, :email, :doctor_id, :appointment_date, :appointment_time, :message)
            ");
            
            $stmt->execute([
                ':patient_name' => $patientName,
                ':phone' => $phone,
                ':email' => $email,
                ':doctor_id' => $doctorId,
                ':appointment_date' => $appointmentDate,
                ':appointment_time' => $appointmentTime,
                ':message' => $message
            ]);
            
            $successMessage = 'Ваша запись успешно оформлена! Мы свяжемся с вами для подтверждения.';
        } catch (PDOException $e) {
            $errorMessage = 'Ошибка при записи: ' . $e->getMessage();
        }
    }
}

// Получение списка врачей
$doctorsStmt = $pdo->query("SELECT id, name, specialty FROM doctors ORDER BY name");
$doctorsList = $doctorsStmt->fetchAll();

$pageTitle = 'Запись к врачу - МедЦентр Здоровье';
include 'includes/header.php';
?>

    <main class="main">
        <section class="appointment-section">
            <div class="appointment__container">
                <h2 class="appointment__title">Запись к врачу</h2>
                
                <?php if ($successMessage): ?>
                <div class="alert alert--success">
                    <?php echo htmlspecialchars($successMessage); ?>
                </div>
                <?php endif; ?>
                
                <?php if ($errorMessage): ?>
                <div class="alert alert--error">
                    <?php echo htmlspecialchars($errorMessage); ?>
                </div>
                <?php endif; ?>

                <form class="appointment-form" method="POST" action="appointment.php">
                    <div class="form-group">
                        <label for="patient_name" class="form-label">ФИО пациента <span class="required">*</span></label>
                        <input 
                            type="text" 
                            id="patient_name" 
                            name="patient_name" 
                            class="form-input" 
                            required
                            placeholder="Иванов Иван Иванович"
                            value="<?php echo htmlspecialchars($_POST['patient_name'] ?? ''); ?>"
                        >
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone" class="form-label">Телефон <span class="required">*</span></label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                class="form-input" 
                                required
                                placeholder="+7 (999) 123-45-67"
                                value="<?php echo htmlspecialchars($_POST['phone'] ?? ''); ?>"
                            >
                        </div>

                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="form-input"
                                placeholder="example@mail.ru"
                                value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="doctor_id" class="form-label">Выберите специалиста <span class="required">*</span></label>
                        <select id="doctor_id" name="doctor_id" class="form-select" required>
                            <option value="">-- Выберите врача --</option>
                            <?php foreach ($doctorsList as $doctor): ?>
                            <option value="<?php echo $doctor['id']; ?>" <?php echo (isset($_POST['doctor_id']) && $_POST['doctor_id'] == $doctor['id']) ? 'selected' : ''; ?>>
                                <?php echo htmlspecialchars($doctor['name']); ?> - <?php echo htmlspecialchars($doctor['specialty']); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="appointment_date" class="form-label">Дата приема <span class="required">*</span></label>
                            <input 
                                type="date" 
                                id="appointment_date" 
                                name="appointment_date" 
                                class="form-input" 
                                required
                                min="<?php echo date('Y-m-d'); ?>"
                                value="<?php echo htmlspecialchars($_POST['appointment_date'] ?? ''); ?>"
                            >
                        </div>

                        <div class="form-group">
                            <label for="appointment_time" class="form-label">Время приема <span class="required">*</span></label>
                            <input 
                                type="time" 
                                id="appointment_time" 
                                name="appointment_time" 
                                class="form-input" 
                                required
                                min="08:00"
                                max="20:00"
                                value="<?php echo htmlspecialchars($_POST['appointment_time'] ?? ''); ?>"
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="message" class="form-label">Комментарий</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            class="form-textarea" 
                            rows="4"
                            placeholder="Опишите ваши жалобы или причину обращения..."
                        ><?php echo htmlspecialchars($_POST['message'] ?? ''); ?></textarea>
                    </div>

                    <button type="submit" class="form-submit">Записаться на прием</button>
                    
                    <p class="form-note">
                        <span class="required">*</span> - обязательные поля для заполнения
                    </p>
                </form>
            </div>
        </section>
    </main>

<?php include 'includes/footer.php'; ?>
