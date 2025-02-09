//
//  CustomView28.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView28: View {
    @State public var text36Text: String = "Search Jobs"
    var body: some View {
        VStack(alignment: .center, spacing: -2) {
            Text(text36Text)
                .foregroundColor(Color(red: 0.32, green: 0.29, blue: 0.34, opacity: 1.00))
                .font(.custom("MulishRoman-Regular", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
        }
        .frame(height: 18, alignment: .top)
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct CustomView28_Previews: PreviewProvider {
    static var previews: some View {
        CustomView28()
    }
}
