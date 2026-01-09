import {Link} from 'react-router-dom';

const RouteTest = () => {
    return <>
    <Link to={'/'}>HOME</Link>
    <br/>
    <Link to={'/diary'}>DIARY</Link>
    <br/>
    <Link to={'/NEW'}>NEW</Link>
    <br/>
    <Link to={'/EDIT'}>EDIT</Link>
    <br/>
    </>
}

export default RouteTest;