export const signupConfig = [
    {
        name: 'address',
        label: 'Address:',
        type: 'text',
        placeholder: 'Enter your address',
    },
    {
        name: 'phone',
        label: 'Phone:',
        type: 'text',
        placeholder: 'Enter your phone number',
    },
    {
        name: 'picture',
        label: 'Profile Picture',
        type: 'file',
        placeholder: 'Upload a profile picture',
    },
];

export const initialValues = {
    address: '',
    phone: '',
    picture: '',
};