import "./UserCardVerse.css"

interface IUserCardVerse {
    label: string;
    data: string;
}

export default function UserCardVerse({ label, data }: IUserCardVerse) {
    return (
        <div className="card-verse-container poppins">
            <div className="main-label-verse"><p>{label}</p></div>
            <p className="card-verse-data">{data}</p>
        </div>
    )
}
