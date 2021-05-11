module.exports = {
    sanityCheckUserRegistration: (requestBody) => {

        if (!requestBody) throw new Error({ message: 'Message Body cannot be empty.' });

        let { userName, password, confirmPassword, organisation } = requestBody;

        if (!userName || !password || !confirmPassword || !organisation) throw new Error({ message: 'One or more fields missing' });

        if (password !== confirmPassword) throw new Error({ message: 'Passwords dont match.' });

        return true;

    },

    sanityCheckLoginDetails: (requestBody) => {

        if (!requestBody) throw new Error({ message: 'Message Body cannot be empty.' });

        let { userName, password } = requestBody;

        if (!userName || !password) throw new Error({ message: 'One or more fields missing' });

    }
}