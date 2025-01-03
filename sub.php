<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'vendor/autoload.php'; // Adjust path if you downloaded manually

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email content
    $subject = "New Subscriber: $name";
    $message = "You have a new subscriber.<br><br>Name: $name<br>Email: $email";

    // PHPMailer setup
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Your Gmail address
        $mail->Password = 'your-gmail-password'; // Your Gmail password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('no-reply@example.com', 'Website'); // Adjust "From" email and name
        $mail->addAddress('your-email@gmail.com'); // Replace with your recipient email address

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        // Send email
        $mail->send();
        echo "Thank you for subscribing!";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
