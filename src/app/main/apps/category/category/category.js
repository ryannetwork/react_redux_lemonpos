import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography,Checkbox,FormControlLabel} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
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

class Category extends Component {

    state = {
        tabValue: 0,
        form    : null
    };

    componentDidMount()
    {
        this.props.getCategories();
        this.updateCategoryState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
       
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateCategoryState();
        }

        if (
            (this.props.category.data && !this.state.form) ||
            (this.props.category.data && this.state.form && this.props.category.data._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }

    updateFormState = () => {
     
        this.setState({form: this.props.category.data})
    };

    updateCategoryState = () => {
        const params = this.props.match.params;
        const {categoryId} = params;
       
        if ( categoryId === 'new' )
        {
            this.props.newCategory();
        }
        else
        {
            this.props.getCategory(this.props.match.params);
        }
     
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        const {catDesc} = this.state.form;
        return (
            catDesc.length > 0 &&
            !_.isEqual(this.props.category.data, this.state.form)
        );
    }

    render()
    {

        const {classes, saveCategory,removeCategory} = this.props;
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/category/categories">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Category
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {form.catImage.length > 0 ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.catImage, {id: form.featuredImageId}).url} alt={form.catDesc}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.catDesc}/>
                                        )}
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.catDesc ? form.catDesc : 'New Category'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Category Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    //disabled={!this.canBeSubmitted()}
                                    onClick={() =>!this.canBeSubmitted()? removeCategory(form):saveCategory(form)}
                                    
                                >
                                    { !this.canBeSubmitted()?'Remove':'Save'}
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
                        <Tab className="h-64 normal-case" label="Category Images"/>
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
                                        error={form.catCode === ''}
                                        required
                                        label="Code"
                                        autoFocus
                                        id="catCode"
                                        name="catCode"
                                        value={form.catCode}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="catDesc"
                                        name="catDesc"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.catDesc}
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                        <TextField
                                        className="mt-8 mb-16"
                                        id="catDesc2"
                                        name="catDesc2"
                                        onChange={this.handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.catDesc2}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <FormControlLabel control={
                                          <Checkbox
                                     
                                          id="catStatus"
                                          name="catStatus"
                                          checked={form.catStatus}
                                          onChange={this.handleChange}
                                         />
                                    }
                                    label="Status"
                                    />
                                   
                                    {/* <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            this.props.categories.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'categories')}
                                        placeholder="Select multiple categories"
                                        textFieldProps={{
                                            label          : 'Categories',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        isMulti
                                    /> */}
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
                                                <img className="max-w-none w-auto h-full" src={media.url} alt="product"/>
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
        getCategories:Actions.getCategories,
        getCategory : Actions.getCategory,
        newCategory : Actions.newCategory,
        saveCategory: Actions.saveCategory,
        removeCategory:Actions.removeCategory
     
    }, dispatch);
}

function mapStateToProps({categoryApp})
{
    return {
        categories:categoryApp.categories,
        category: categoryApp.category
        
    }
}

export default withReducer('categoryApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))));
