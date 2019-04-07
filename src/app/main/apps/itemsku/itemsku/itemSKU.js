import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography,Checkbox,FormControlLabel} from '@material-ui/core';
import {FuseAnimate, FusePageCarded,FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter,Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';


const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class ItemSKU extends Component {

    state = {
        tabValue: 0,
        form    : null,
        itemssku:[]
    };

    componentDidMount()
    {
       
        this.updateState();
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        
       
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateState();
        }

        if (
            (this.props.itemsku.data && !this.state.form) ||
            (this.props.itemsku.data && this.state.form && this.props.itemsku.data._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }

    updateFormState = () => {
     
        this.setState({form: this.props.itemsku.data,itemssku :this.props.itemssku});
    };

    updateState = () => {
        const params = this.props.match.params;
        const {itemSKUId} = params;
        this.props.getItemsSKU();
        if ( itemSKUId === 'new' )
        {
            this.props.newItemSKU();
        }
        else
        {
            this.props.getItemSKU(this.props.match.params);
        }
     
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value) => {
   
        this.setState({form: _.set({...this.state.form}, 'skuParent', value)});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        const {skuName} = this.state.form;
        return (
            skuName.length > 0 &&
            !_.isEqual(this.props.itemsku.data, this.state.form)
        );
    }
    render()
    {
        if(this.props.itemsku.isReady){
            return <Redirect to={"/apps/itemsku/itemssku"}/>
           
        }
        const {classes, saveItemSKU,removeItemSKU,updateItemSKU} = this.props;
        const {tabValue, form} = this.state;
      
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/itemsku/itemssku">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Item SKU
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.skuName}/>
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.skuName ? form.skuName : 'New Item SKU'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Item SKU Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()&& form._id===undefined}
                                    onClick={() =>form._id===undefined?saveItemSKU(form): this.canBeSubmitted() && form._id!==undefined? updateItemSKU(form):removeItemSKU(form)}
                                    
                                >
                               
                                    {form._id===undefined?'Save':this.canBeSubmitted() && form._id !==undefined?"Update":'Remove'}
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        {/* <Tab className="h-64 normal-case" label="ItemSKU Images"/> */}
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.skuCode === ''}
                                        required
                                        label="Code /SKU Code"
                                        autoFocus
                                        id="skuCode"
                                        name="skuCode"
                                        value={form.skuCode}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="skuName"
                                        name="skuName"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.skuName}
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                        <TextField
                                        className="mt-8 mb-16"
                                        id="skuDesc"
                                        name="skuDesc"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.skuDesc}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <FormControlLabel control={
                                          <Checkbox
                                     
                                          id="skuStatus"
                                          name="skuStatus"
                                          checked={form.skuStatus}
                                          onChange={this.handleChange}
                                         />
                                    }
                                    label="Status"
                                    />
                                   
                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={form.skuParent
                                        }
                                        onChange={(value) => this.handleChipChange(value)}
                                        placeholder="Select itemsku"
                                        textFieldProps={{
                                            label          : 'Items SKU',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                       options={
                                        this.state.itemssku.data.map(item => ({
                                            label: item.skuName,
                                            value: item.skuCode
                                           
                                        }))}
                                    />
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                    <div className="flex justify-center sm:justify-start flex-wrap">
                                        {form.images.map(media => (
                                            <div
                                                onClick={() => this.setFeaturedImage(media.id)}
                                                className={
                                                    classNames(
                                                        classes.productImageItem,
                                                        "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer",
                                                        (media.id === form.featuredImageId) && 'featured')
                                                }
                                                key={media.id}
                                            >
                                                <Icon className={classes.productImageFeaturedStar}>star</Icon>
                                                <img className="max-w-none w-auto h-full" src={media.url} alt="sku"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getItemsSKU:Actions.getItemsSKU,
        getItemSKU : Actions.getItemSKU,
        newItemSKU : Actions.newItemSKU,
        saveItemSKU: Actions.saveItemSKU,
        updateItemSKU:Actions.updateItemSKU,
        removeItemSKU:Actions.removeItemSKU
     
    }, dispatch);
}

function mapStateToProps({itemskuApp})
{
    return {
        itemssku:itemskuApp.itemssku,
        itemsku: itemskuApp.itemsku
        
    }
}

export default withReducer('itemskuApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemSKU))));
