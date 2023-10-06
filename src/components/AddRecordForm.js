import React, {useState} from 'react';

function AddRecordForm() {
    const [record, setRecord] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {record};

        try {
            const response = await fetch('http://localhost:8000/add_records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={record}
                onChange={(e) => setRecord(e.target.value)}
            />
            <button type="submit">Add Record</button>
        </form>
    );
}

export default AddRecordForm;