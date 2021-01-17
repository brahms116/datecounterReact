import AuthContext from "./AuthContext";
import DateItemContext from "./DateItemContext";

export default function DataProvider(props: { children: React.ReactNode }) {
    return (
        <AuthContext>
            <DateItemContext>{props.children}</DateItemContext>
        </AuthContext>
    );
}
