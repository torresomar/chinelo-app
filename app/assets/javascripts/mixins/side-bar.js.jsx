var SidebarBase = {
    getInitialState: function () {
        return {shown: this.props.show};
    },
    calcSide: function (width) {
        return this.state.shown ? 0 : -width;
    },
    open: function () {
        this.setState({shown: true});
    },
    componentWillReceiveProps: function (new_props) {
        this.setState({
            shown: new_props.show
        });
    },
    isLeft: function () {
        return this.props.side === 'left';
    },
    baseStyles: function () {
        var props = this.props,
        isLeft = this.isLeft();
        return {
            boxShadow: (isLeft ? '' : '-') + '2px 0 7px rgba(3, 0, 3, 0.2)',
            backgroundColor: '#FFFFFF',
            zIndex: 1050,
            width: props.width,
            height: '100%',
            position: 'fixed',
            top: props.top,
            left: isLeft ? this.calcSide(props.width) : undefined,
            right: isLeft ? undefined : this.calcSide(props.width),
            WebkitTransition: 'all 0.5s ease',
            MozTtransition: 'all 0.5s ease',
            transition: 'all 0.5s ease'
        };
    }
};

module.exports = SidebarBase;
