const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailVerificacao = async (email, token) => {
    const link = `${process.env.FRONTEND_URL}/verificar-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'Meu Projeto <onboarding@resend.dev>',
        to: email,
        subject: 'Confirme seu email',
        html: `
            <h2>Bem-vindo!</h2>
            <p>Clique no link abaixo para confirmar seu email:</p>
            <a href="${link}">Confirmar meu email</a>
            <p>Este link expira em 30 minutos.</p>
        `
    });

    if (error) {
        console.error('Erro ao enviar email:', error);
        throw new Error(error.message);
    }

    console.log('Email enviado com sucesso:', data.id);

    return data;
};

module.exports = { enviarEmailVerificacao };