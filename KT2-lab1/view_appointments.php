<?php
require_once 'config.php';

$pdo = getDBConnection();

// Получение всех записей с информацией о врачах
$stmt = $pdo->query("
    SELECT 
        a.id,
        a.patient_name,
        a.phone,
        a.email,
        a.appointment_date,
        a.appointment_time,
        a.message,
        a.created_at,
        d.name as doctor_name,
        d.specialty as doctor_specialty
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
");
$appointments = $stmt->fetchAll();

$pageTitle = 'Просмотр записей - МедЦентр Здоровье';
include 'includes/header.php';
?>

    <main class="main">
        <section class="appointments-view">
            <div class="appointments__container">
                <h2 class="appointments__title">Записи к врачам</h2>
                
                <?php if (count($appointments) > 0): ?>
                <div class="appointments-table-wrapper">
                    <table class="appointments-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Пациент</th>
                                <th>Телефон</th>
                                <th>Email</th>
                                <th>Врач</th>
                                <th>Дата приема</th>
                                <th>Время</th>
                                <th>Комментарий</th>
                                <th>Дата записи</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($appointments as $appointment): ?>
                            <tr>
                                <td><?php echo $appointment['id']; ?></td>
                                <td><strong><?php echo htmlspecialchars($appointment['patient_name']); ?></strong></td>
                                <td><?php echo htmlspecialchars($appointment['phone']); ?></td>
                                <td><?php echo htmlspecialchars($appointment['email'] ?: '-'); ?></td>
                                <td>
                                    <?php echo htmlspecialchars($appointment['doctor_name']); ?><br>
                                    <small><?php echo htmlspecialchars($appointment['doctor_specialty']); ?></small>
                                </td>
                                <td><?php echo date('d.m.Y', strtotime($appointment['appointment_date'])); ?></td>
                                <td><?php echo date('H:i', strtotime($appointment['appointment_time'])); ?></td>
                                <td><?php echo htmlspecialchars($appointment['message'] ?: '-'); ?></td>
                                <td><?php echo date('d.m.Y H:i', strtotime($appointment['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <p class="appointments__count">Всего записей: <strong><?php echo count($appointments); ?></strong></p>
                <?php else: ?>
                <div class="alert alert--info">
                    Записей пока нет.
                </div>
                <?php endif; ?>
            </div>
        </section>
    </main>

<?php include 'includes/footer.php'; ?>
