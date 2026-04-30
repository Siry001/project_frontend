import Box from "@mui/material/Box";

export default function MealCard({ data, url }) {
    return (
        <Box style={{ borderRadius: "10px", overflow: 'hidden', width: "250px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ height: "150px", overflow: "hidden" }}>
                <div className="image-box" style={{ height: "inherit", backgroundImage: `url(${url})` }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", padding: "5px 0 10px 10px", textAlign: "left" }}>
                <h4 style={{ fontSize: "15px", padding: "0", margin: "0", color: "white" }}>{data.name}</h4>
                <p style={{ fontWeight: "100", fontSize: "12px", color: "#94a3b8" }}>Whole grain sourdough topped with smashed avocado, poached egg, and chili flakes.</p>
                <p style={{ color: "#94a3b8", paddingTop: "15px" }}>{data.calories} calories</p>
            </div>
        </Box>
    )
}