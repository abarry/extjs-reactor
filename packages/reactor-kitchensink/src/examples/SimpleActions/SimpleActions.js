import React, { Component } from 'react';
import { List, Panel } from '@extjs/reactor/modern';
import data from '../BasicList/data';
import { Template } from '@extjs/reactor';

Ext.require([
    'Ext.Toast',
    'Ext.plugin.ListSwiper'
]);

export default class SimpleActionsExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name']
    });

    onItemAction = (list, index, record, action) => {
        Ext.toast(`${Ext.String.capitalize(action)} ${record.get('first_name')} ${record.get('last_name')}`);
    }

    tpl = new Template(data => <div>{data.first_name} {data.last_name}</div>);

    render() {
        return (
            <List
                shadow
                itemTpl={this.tpl}
                store={this.store}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
                plugins={{ 
                    type: 'listswiper',
                    actions: {
                        call: {
                            direction: 'left',
                            widget: {
                                iconCls: 'x-fa fa-phone',
                                text: 'Call'
                            }
                        },
                        message: {
                            direction: 'right',
                            widget: {
                                iconCls: 'x-fa fa-envelope',
                                text: 'Message'
                            }
                        }
                    }
                }}
                onItemAction={this.onItemAction}
            >
                <Panel ui="instructions" docked="top">
                    <div style={{textAlign: 'center', color: '#888'}}>Swipe left to call, right to message.</div>
                </Panel>
            </List>
        )
    }

}