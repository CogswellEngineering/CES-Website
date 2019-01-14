import styled from 'styled-components';
import {Link} from 'react-router-dom';

//More like widely used but general fine.

export const UserLink = styled(Link)`

    text-decoration:none;
    font-style:italic;
    color:white;
    &:hover{

        color: rgb(254, 161, 0);

    }
`;