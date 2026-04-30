import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MealCard from './MealCard';

let url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2k9NcxSuflXYgBH8qSj2BPd2ysaZ7TkrZXg&s'

export default function MealSection({ title, color, foods }) {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <WbSunnyIcon style={{ color: color }} />
                <h3>{title}</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", width: "100%" }}>
                {foods && foods.map((meal, index) => (
                    <MealCard key={index} data={{ name: meal.name, calories: meal.calories }} url={url} />
                ))}
            </div>
        </div >
    )
}