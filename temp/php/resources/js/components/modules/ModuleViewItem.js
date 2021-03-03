import React from "react"

export default function ModuleViewItem(props) {

    return (
        <tr>
            <th scope="row">{ props.title }</th>
            <td>{ props.data}</td>
        </tr>
    )

}
