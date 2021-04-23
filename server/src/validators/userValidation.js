module.exports = {
    sanityCheckUserRegistration: (requestBody) => {

        if (!requestBody) res.status(400).send({ message: 'Message Body cannot be empty.' });

        let { userName, password, confirmPassword, organisation } = requestBody;

        if (!userName || !password || !confirmPassword || !organisation) res.status(400).send({ message: 'One or more fields missing' });

        if (password !== confirmPassword) res.status(400).send({ message: 'Passwords dont match.' });

    },

    sanityCheckLoginDetails: (requestBody) => {

        if (!requestBody) res.status(400).send({ message: 'Message Body cannot be empty.' });

        let { userName, password } = requestBody;

        if (!userName || !password) res.status(400).send({ message: 'One or more fields missing' });

    }
}