import React from 'react';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

export default ({ page, perPage, total, setPage, ...props }) => {
    // console.log(props);
    return (
        <Toolbar>
            {page > 1 &&
            <Button color="primary" key="prev" icon={<ChevronLeft />} onClick={() => setPage(page - 1)}>
                Prev
            </Button>
            }
            {total > (perPage * page) &&
            <Button color="primary" key="next" icon={<ChevronRight />} onClick={() => setPage(page + 1)} labelposition="before">
                Next
            </Button>
            }
        </Toolbar>
    );
};
