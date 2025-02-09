//
//  CustomView5.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView5: View {
    @State public var text1Text: String = "Search Jobs"
    var body: some View {
        VStack(alignment: .center, spacing: -2) {
            Text(text1Text)
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

struct CustomView5_Previews: PreviewProvider {
    static var previews: some View {
        CustomView5()
    }
}
