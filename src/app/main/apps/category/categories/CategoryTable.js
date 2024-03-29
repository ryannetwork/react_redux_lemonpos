import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import CategoryTableHead from './CategoryTableHead';
import * as Actions from '../store/actions';
import  {socket} from '../../../../socket';
class CategoryTable extends Component {
    constructor(props){
        super(props);
        socket.on('createdCategory',(res)=>{
            this.props.updateCategories(res);
        });
        socket.on('updatedCategory',(res)=>{
            this.props.updateCategories(res);
            
        });
        socket.on('deletedCategory',(Id)=>{
            this.props.deleteCategories(Id);
        });
    }
state = {
    order      : 'asc',
    orderBy    : null,
    selected   : [],
    data       : this.props.categories,
    page       : 0,
    rowsPerPage: 10
};

    componentDidMount()
    {
        this.props.getCategories();
        
    }
    componentWillUnmount(){
        
         socket.removeAllListeners();
    }
    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.categories, prevProps.categories) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.categories, this.props.searchText);
            this.setState({data});
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item.catDesc.toLowerCase().includes(searchText.toLowerCase()));
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n._id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/apps/category/categories/' + item._id + '/' + item.catDesc);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
   
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <CategoryTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'categories':
                                        {
                                            return o.categories[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n._id);
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}
                                            onClick={event => this.handleClick(n)}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n._id)}
                                                />
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" padding="none">
                                                {n.catImage.length > 0 ? (
                                                    <img className="w-full block rounded" src={_.find(n.catImage, {id: n.featuredImageId}).url} alt={n.catDesc}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.catDesc}/>
                                                )}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.catCode}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.catDesc}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.catDesc2}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.catParent.map(n=>n.label).join(",")}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.catStatus ?
                                                    (
                                                        <Icon className="text-green text-20">check_circle</Icon>
                                                    ) :
                                                    (
                                                        <Icon className="text-red text-20">remove_circle</Icon>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategories: Actions.getCategories,
        updateCategories:Actions.updateCategories,
        deleteCategories:Actions.deleteCategories,
    }, dispatch);
}

function mapStateToProps({categoryApp})
{
    return {
        categories  : categoryApp.categories.data,
        searchText: categoryApp.categories.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryTable));
