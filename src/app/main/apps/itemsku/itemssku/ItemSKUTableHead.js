import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';

const rows = [
    {
        id            : 'skuCode',
        align         : 'left',
        disablePadding: false,
        label         : 'Code / SKU Code',
        sort          : true
    },
    {
        id            : 'skuName',
        align         : 'left',
        disablePadding: false,
        label         : 'SKU Name',
        sort          : true
    },
    {
        id            : 'skuDesc',
        align         : 'left',
        disablePadding: false,
        label         : 'Description',
        sort          : true
    },
    {
        id            : 'skuParent',
        align         : 'left',
        disablePadding: false,
        label         : 'Parent',
        sort          : true
    },
    {
        id            : 'skuStatus',
        align         : 'right',
        disablePadding: false,
        label         : 'Status',
        sort          : true
    }
   
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ItemSKUTableHead extends React.Component {
    state = {
        selected: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelected = (event) => {
        this.setState({selected: event.currentTarget});
    };

    closeSelected = () => {
        this.setState({selected: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selected} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selected ? 'selected' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelected}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selected"
                                    anchorEl={selected}
                                    open={Boolean(selected)}
                                    onClose={this.closeSelected}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelected();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ItemSKUTableHead);
