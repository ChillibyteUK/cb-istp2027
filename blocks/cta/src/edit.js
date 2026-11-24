import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, ToggleControl, RadioControl } from '@wordpress/components';
import SiteUrlInput from '../../_shared/SiteUrlInput';
import EditorBlockShell from '../../_shared/EditorBlockShell';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title, linkText, linkUrl, linkTarget, buttonStyle } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="CTA" textDomain="cb-istp2027">
			<TextControl
				label={ __( 'Title (h2)', 'cb-istp2027' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
			/>
			<div className="cb-istp2027-editor-field-pair">
				<TextControl
					label={ __( 'Link text', 'cb-istp2027' ) }
					value={ linkText }
					onChange={ ( value ) => setAttributes( { linkText: value } ) }
				/>
				<SiteUrlInput
					label={ __( 'Link URL', 'cb-istp2027' ) }
					value={ linkUrl || '' }
					onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
				/>
			</div>
			<ToggleControl
				label={ __( 'Open link in a new tab', 'cb-istp2027' ) }
				checked={ linkTarget }
				onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
			/>
			<div className="cb-istp2027-radio-inline">
				<RadioControl
					label={ __( 'Button style', 'cb-istp2027' ) }
					selected={ buttonStyle }
					options={ [
						{ label: __( 'Primary', 'cb-istp2027' ), value: 'primary' },
						{ label: __( 'Secondary', 'cb-istp2027' ), value: 'secondary' },
						{ label: __( 'Light', 'cb-istp2027' ), value: 'light' },
					] }
					onChange={ ( value ) => setAttributes( { buttonStyle: value } ) }
				/>
			</div>
		</EditorBlockShell>
	);
}
