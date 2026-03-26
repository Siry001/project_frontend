import CircularProgress from '@mui/material/CircularProgress';

export function Loader() {
    return (
        <div style={{width: "100%", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress />
        </div>
    )
}