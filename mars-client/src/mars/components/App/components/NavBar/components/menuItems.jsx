import React from 'react';
import Item from './item';
import Dropdown from './Dropdown/dropdown';

const MenuItems = () => {
    render() {
        const items = this.props.items.map((item, index) => this.itemElement(item, `i${index}`));

        return <ul>
            {items}
        </ul>;
    },

    itemElement(item, ref) {
        return (
            item.items ?
            <Dropdown {...item} ref={ref} key={ref}/> :
            <Item {...item} ref={ref} key={ref}/>
        )
    }
}

export default MenuItems
