interface IUserCardInfo {
    info: string;
    style?: object;
}

export default function UserCardInfos({ info, style }: IUserCardInfo) {
    return (
        <div style={style} className="label-info">
            <label className="poppins info">{info}</label>
        </div>
    )
}