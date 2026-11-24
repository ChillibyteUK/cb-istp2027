import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import EditorBlockShell from '../../_shared/EditorBlockShell';
import RepeaterField from '../../_shared/RepeaterField';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title, cards } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="Icon Cards" textDomain="cb-istp2027">
			<TextControl
				label={ __( 'Title (h2)', 'cb-istp2027' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
			/>
			<RepeaterField
				label={ __( 'Cards', 'cb-istp2027' ) }
				value={ cards }
				onChange={ ( value ) => setAttributes( { cards: value } ) }
				layout="column"
				fields={ [
					{ name: 'icon', label: __( 'Icon (SVG or PNG)', 'cb-istp2027' ), type: 'image' },
					{ name: 'title', label: __( 'Title (h3)', 'cb-istp2027' ), type: 'text' },
					{ name: 'content', label: __( 'Content', 'cb-istp2027' ), type: 'textarea' },
				] }
				emptyRow={ { icon: 0, iconUrl: '', title: '', content: '' } }
			/>
		</EditorBlockShell>
	);
}
