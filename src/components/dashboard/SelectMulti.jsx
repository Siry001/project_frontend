import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMulti({ state, data }) {
    const handleChange = (event) => {
        state.setPlan(event.target.value);
    };

    return (
        <>
            {data && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <FormControl sx={{ p: 1, m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Select Plan</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={state.plan}
                            label="Age"
                            onChange={handleChange}
                        >
                            {data.plans.map((item) => <MenuItem value={item.id}>{item.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
            )}
        </>
    )
}