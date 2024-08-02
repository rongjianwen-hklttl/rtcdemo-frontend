import React from 'react'
import { CKEditor as Editor /*, CKEditorContext */ } from '@ckeditor/ckeditor5-react'

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
//import { Context } from '@ckeditor/ckeditor5-core'

import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Italic, Underline, Code, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { LinkImage, AutoLink } from '@ckeditor/ckeditor5-link'
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload'
import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    AutoImage,
    ImageResize,
    ImageInsert,
} from '@ckeditor/ckeditor5-image'
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'
import { Link } from '@ckeditor/ckeditor5-link'
import { List } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Table, TableToolbar, TableProperties, TableCellProperties } from '@ckeditor/ckeditor5-table'

import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing'

export default function CKEditor(props) {
    const {
        onChange,
        value = '',
        uploadUrl = '/api/upload',
        disabled = false,
        ...rest
    } = props

    const EditorProps = {
        ...rest,
        disabled,
        editor: ClassicEditor,
        data: value,
        onReady: (editor) => {
            editor.keystrokes.set( 'Tab', ( data, cancel ) => {
				const command = editor.commands.get( 'indentBlock' );

				if ( command.isEnabled ) {
					command.execute();
					cancel();
				}
			} );

			editor.keystrokes.set( 'Shift+Tab', ( data, cancel ) => {
				const command = editor.commands.get( 'outdentBlock' );

				if ( command.isEnabled ) {
					command.execute();
					cancel();
				}
			} );
        },
        config: {
            plugins: [
                Essentials,
                Bold,
                Italic,
                Underline,
                Code,
                Subscript,
                Superscript,
                Indent,
                IndentBlock,
                Heading,
                BlockQuote,
                FontBackgroundColor,
                FontColor,
                FontFamily,
                FontSize,
                List,
                Link,
                AutoLink,
                Image,
                ImageToolbar,
                ImageCaption,
                ImageStyle,
                ImageResize,
                LinkImage,
                ImageTextAlternative,
                ImageUpload,
                AutoImage,
                ImageInsert,
                SimpleUploadAdapter,
                Table,
                TableToolbar,
                TableProperties,
                TableCellProperties,
                SourceEditing,
                Autoformat,
            ],
            toolbar: {
                items: [
                    'undo', 'redo', '|',
                    'bold', 'italic', 'underline', '|',
                    '|','subscript', 'superscript', '|',
                    '|', 'outdent', 'indent', '|',
                    'blockQuote', 'code', '|',
                    '|', 'fontBackgroundColor', 'fontColor', 'fontFamily', 'fontSize', '|',
                    '|', 'numberedList', 'bulletedList', '|',
                    'link',
                    'insertTable',
                    'insertImage',
                    'sourceEditing',
                ],
                shouldNotGroupWhenFull: true
            },
            indentBlock: {
                offset: 1,
                unit: 'em'
            },
            fontFamily: {
                options: [
                    'default',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif',
                    'Noto Sans TC, sans-serif'
                ],
                supportAllValues: true
            },
            fontSize: {
                options: [
                    9,
                    11,
                    14,
                    'default',
                    20,
                    24,
                    28,
                    36,
                ],
                supportAllValues: true
            },
            table: {
                contentToolbar: [
                    'tableColumn', 'tableRow', 'mergeTableCells',
                    'tableProperties', 'tableCellProperties'
                ],               
                tableProperties: {

                },
                tableCellProperties: {

                }
            },
            image: {
                toolbar: [
                    'imageStyle:block',
                    'imageStyle:side',
                    '|',
                    'toggleImageCaption',
                    'imageTextAlternative',
                    '|',
                    'linkImage'
                ],
                insert: {
                    type: 'auto'
                }
            },
            simpleUpload: {
                uploadUrl,
                withCredentials: true,
                headers: {
                    //'X-CSRF-TOKEN': 'CSRF-Token',
                    //Authorization: 'Bearer '+storage.getItem('access_token')
                }
            }
        }
    }
    
    if (onChange) {
        EditorProps.onChange = (event, editor) => {
            onChange({target: {value: editor.getData()}})
        }
    }
    
    return (
        <Editor {...EditorProps} />
    )
}
