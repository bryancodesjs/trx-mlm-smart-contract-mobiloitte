import LoadingOverlay from 'react-loading-overlay'
import BarLoader from "react-spinners/BarLoader";
import ClockLoader from "react-spinners/ClockLoader";

// height={100} width={20} radius={10} margin={5}


export default function MyLoader({ active }) {
    return (
        <LoadingOverlay
            active={active}
            spinner={<BarLoader height={4} width={100}
                color={"#7CBC8C"} />}
        >
        </LoadingOverlay>
    )
}

export function MyClockLoader({ active }) {
    return (
        <LoadingOverlay
            active={active}
            spinner={<ClockLoader size={100}
                color={"white"} />}
        >
        </LoadingOverlay>
    )
}