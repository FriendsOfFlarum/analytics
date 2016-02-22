import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';
import FieldSet from 'flarum/components/FieldSet';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

export default class AnalyticsPage extends Component {

    view() {
        return [
            m('div', {className: 'analyticsPage'}, [
                'This page is under construction'
            ])
        ]
    }
}
